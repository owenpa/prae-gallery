'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import type { FileObj, ImageDataToDB } from './types/types'
import { db } from '@vercel/postgres'
import type { QueryResult } from '@vercel/postgres'
import { readdirSync } from 'fs'
import { unlink } from 'fs/promises'

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
      const queryResult = await client.query(queryInsert, [fileName, 0, price, description])
      console.log(`Successfully created image: ${fileName}`)
      return queryResult.rows[0]
    }
  } catch (error) {
    throw new Error('Failed to insert image data into database.')
  }
}

export async function pullImageInfoFromDb (): Promise<FileObj[] | never[]> {
  try {
    const localImages = readdirSync('./public/assets/gallery')
    const queryAbleImageNames = localImages.reduce((nameAcc: string[], imageName) => {
      // eslint-disable-next-line no-useless-escape
      if (!(/(^|\/)\.[^\/\.]/g).test(imageName)) {
        nameAcc.push(`'${imageName}'`)
      }
      return nameAcc
    }, []).join(', ')
    if (queryAbleImageNames.length === 0) {
      return []
    }
    const client = await db.connect()
    const query = `
    SELECT * FROM Images
    WHERE ImageName IN (${queryAbleImageNames})    
    `
    const queryResult = await client.query(query)

    if (queryResult.rowCount === 0) {
      console.error('Error while pulling image information from the database')
    } else {
      console.log(`Successful image pull from the database: ${queryAbleImageNames}`)
    }
    return queryResult.rows
  } catch (error) {
    throw new Error('Failed to pull images from database: ')
  }
}

export async function deleteImageInfoFromDb (prevState: string[] | undefined, formData: FormData): Promise<string[] | undefined> {
  // TODO: validate image name ends in various file type extensions
  const imageNameToBeDeleted = formData.get('image-name')?.toString()
  if (imageNameToBeDeleted === undefined) {
    console.error('Error grabbing name from imageNameToBeDeleted in deleteImageInfoFromDb()')
    throw new Error()
  }
  try {
    const client = await db.connect()
    const query = `DELETE FROM Images WHERE ImageName='${imageNameToBeDeleted}'`
    const queryResult = await client.query(query)

    console.log(`Attempting to delete image with the name '${imageNameToBeDeleted} from the database'`)
    if (queryResult.rowCount === 0) {
      console.error(`Image '${imageNameToBeDeleted}' was not found or there was a problem executing the query.`)
    } else {
      console.log(`Successfully deleted an image with the name ${imageNameToBeDeleted} from the database.`)
    }
    console.log(`Attempting to delete image with the name '${imageNameToBeDeleted}' from the local gallery.`)

    const localImages = readdirSync('./public/assets/gallery')
    if (localImages.includes(imageNameToBeDeleted)) {
      await unlink(`./public/assets/gallery/${imageNameToBeDeleted}`)
      console.log(`Successfully deleted an image with the name ${imageNameToBeDeleted} from the local gallery.`)
    }
    return queryResult.rows
  } catch (error) {
    throw new Error(`Error while attempting to delete an image with name "${imageNameToBeDeleted}" from the database.`)
  }
}

export async function addLikeToImage (imageName: string): Promise<void> {
  if (typeof imageName !== 'string') {
    console.error('Error while trying to like an image. The image name was not of type string. ')
    throw new Error()
  }
  try {
    const client = await db.connect()
    const query = `UPDATE Images SET Likes = Likes + 1 WHERE ImageName='${imageName}'`
    const queryResult = await client.query(query)

    console.log(`Attempting to like an image with the name "${imageName}"`)
    if (queryResult.rowCount === 0) {
      console.error(`Image '${imageName}' was not found or there was a problem executing the query.`)
    } else {
      console.log(`Successfully liked an image with the name ${imageName}.`)
    }
  } catch (error) {
    throw new Error(`Error while attempting to like an image with name "${imageName}"`)
  }
}
