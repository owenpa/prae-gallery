'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import type { FileObj, ImageDataToDB } from './types/types'
import { db } from '@vercel/postgres'
import type { QueryResult } from '@vercel/postgres'

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
  let { fileName, title, imageurl, price, description, footer, date } = imageData
  const checkQuery = `
    SELECT *
    FROM Images
    WHERE ImageName = $1
  `
  const queryInsert = `
    INSERT INTO Images (ImageName, ImageTitle, ImageUrl, Likes, Price, Description, DescriptionFooter, Date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `
  price = parseFloat(price).toFixed(2)
  try {
    const checkQueryResult = await client.query(checkQuery, [fileName])
    if (checkQueryResult.rowCount > 0) {
      console.error(`There may be image with the name ${fileName} already in the Images table. The original will not be overwritten.`)
    } else {
      const queryResult = await client.query(queryInsert, [fileName, title, imageurl, 0, price, description, footer, date])
      console.log(`Successfully created image: ${fileName}`)
      return queryResult.rows[0]
    }
  } catch (error) {
    throw new Error('Failed to insert image data into database.')
  }
}

export async function pullImageInfoFromDb (): Promise<FileObj[] | never[]> {
  try {
    const client = await db.connect()
    const query = `
    SELECT * FROM Images
    `
    const queryResult = await client.query(query)

    if (queryResult.rowCount === 0) {
      console.error('Error while pulling image information from the database')
    } else {
      console.log('Successful image pull from the database.')
    }
    return queryResult.rows
  } catch (error) {
    throw new Error('Failed to pull images from database: ')
  }
}

export async function pullSingleImageInfoFromDb (imageName: string): Promise<FileObj | number> {
  try {
    const client = await db.connect()
    const query = `SELECT * FROM Images WHERE LOWER(ImageName)='${imageName.toLocaleLowerCase()}'`
    const queryResult = await client.query(query)
    if (queryResult.rowCount === 0) {
      console.error('Error while pulling single image information from the database')
    } else {
      console.log(`Successful single image pull: ${imageName}`)
    }
    return queryResult.rows[0]
  } catch (error) {
    throw new Error('Failed to pull single image information from the database')
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

    return queryResult.rows
  } catch (error) {
    throw new Error(`Error while attempting to delete an image with name "${imageNameToBeDeleted}" from the database.`)
  }
}

export async function editImageInfoInDb (prevState: string[] | undefined, formData: FormData): Promise<string[] | undefined> {
  if (formData === undefined) return
  try {
    if (formData.get('image-title') === null ||
      formData.get('image-description') === null ||
      formData.get('image-price') === null ||
      formData.get('image-footer') === null ||
      formData.get('image-date') === null ||
      formData.get('image-name') === null
    ) {
      throw new Error(`One of the follow fields is null:
      Title: ${formData.get('image-title') as string}
      Description: ${formData.get('image-description') as string}
      Price: ${formData.get('image-price') as string}
      Footer: ${formData.get('image-footer') as string}
      Date: ${formData.get('image-date') as string}
      Name: ${formData.get('image-name') as string}
      `)
    }
    let reformattedDate = formData.get('image-date') as string | string[]
    reformattedDate = (reformattedDate as string).split('-')
    reformattedDate = `${reformattedDate[1]}/${reformattedDate[2]}/${reformattedDate[0]}`
    const client = await db.connect()
    const query = `UPDATE Images
    SET ImageTitle = '${(formData.get('image-title') as string).replaceAll("'", "''")}', 
    Price = '${formData.get('image-price') as string}', 
    Description = '${(formData.get('image-description') as string).replaceAll("'", "''")}', 
    DescriptionFooter = '${(formData.get('image-footer') as string).replaceAll("'", "''")}', 
    Date = '${reformattedDate}' 
    WHERE ImageName = '${formData.get('image-name') as string}';`

    const queryResult = await client.query(query)
    console.log(`Attempting to update an image with the name "${formData.get('image-name') as string}"`)
    if (queryResult.rowCount === 0) {
      console.error(`Image ${formData.get('image-name') as string} was not found or there was a problem executing the query.`)
    } else {
      console.log(`Successfully edited an image with the name ${formData.get('image-name') as string}`)
    }
  } catch (error) {
    console.error(error)
    throw new Error("Error while attempting to edit an image's info")
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

export async function fetchAnalytics (): Promise<any[]> {
  try {
    const client = await db.connect()
    const query = 'SELECT * FROM Images'
    const queryResult = await client.query(query)

    console.log('Attempting to fetch analytics')
    if (queryResult.rowCount === 0) {
      console.error('No images were found while attempting to fetch analytics')
    } else {
      console.log('Successfully fetched analytics.')
    }
    return queryResult.rows
  } catch (error) {
    throw new Error('Failed to fetch analytics.')
  }
}

export async function addShareViewToImage (imageName: string): Promise<void> {
  if (typeof imageName !== 'string') {
    console.error('Error while trying to add a share to an image. The image name was not of type string. ')
    throw new Error()
  }
  try {
    const client = await db.connect()
    const query = `UPDATE Images SET Shares = Shares + 1 WHERE ImageName='${imageName}'`
    const queryResult = await client.query(query)

    console.log(`Attempting to add a share to "${imageName}"`)
    if (queryResult.rowCount === 0) {
      console.error(`Image '${imageName}' was not found or there was a problem executing the query.`)
    } else {
      console.log(`Successfully added a share to an image with the name ${imageName}.`)
    }
  } catch (error) {
    throw new Error(`Error while attempting to like an image with name "${imageName}"`)
  }
}
