'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import type { FileObj, ImageDataToDB } from './types/types'
import { db } from '@vercel/postgres'
import type { QueryResult } from '@vercel/postgres'
import { readdirSync } from 'fs'

export async function authenticate (prevState: string | undefined, formData: FormData): Promise<string | undefined> {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function addImageInfoToDB (imageData: ImageDataToDB): Promise<QueryResult | undefined> {
  console.log('Attempting to connect to database to add image information')
  const client = await db.connect()
  let { fileName, price, description } = imageData
  const checkQuery = `
    SELECT *
    FROM Images
    WHERE ImageName = $1
  `
  const queryInsert = `
    INSERT INTO Images (ImageName, Likes, Price, Description)
    VALUES ($1, $2, $3, $4)
  `
  price = parseFloat(price).toFixed(2)
  try {
    const checkQueryResult = await client.query(checkQuery, [fileName])
    if (checkQueryResult.rowCount > 0) {
      console.error(`There may be image with the name ${fileName} already in the Images table. The original will not be overwritten.`)
    } else {
      const result = await client.query(queryInsert, [fileName, 0, price, description])
      console.log(`Successfully created image: ${fileName}`)
      return result.rows[0]
    }
  } catch (error) {
    throw new Error('Failed to insert image data into database.')
  }
}

export async function pullImageInfoFromDb (): Promise<FileObj[]> {
  try {
    const localImages = readdirSync('./public/assets/gallery')
    const queryAbleImageNames = localImages.map(imageName => imageName.padStart(imageName.length + 1, '\'').padEnd(imageName.length + 2, '\'')).join(', ')
    const client = await db.connect()
    const query = `
    SELECT * FROM Images
    WHERE ImageName IN (${queryAbleImageNames})    
    `
    const queryResult = await client.query(query)

    if (queryResult.rowCount === 0) {
      console.error('Error while pulling image information from the database')
      return queryResult.rows
    } else {
      console.log(`Successful image pull from the database: ${queryAbleImageNames}`)
      return queryResult.rows
    }
  } catch (error) {
    throw new Error('Failed to pull images from database: ')
  }
}

// export async function deleteImageInfoFromDb (imageName): Promise<string[]> {
//   try {
//   } catch (error) {
//     throw new Error(`Error while attempting to delete an image with name "${imageName}" from the database`)
//   }
// }
