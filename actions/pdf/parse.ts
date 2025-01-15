'use server'

import pdf from 'pdf-parse';

const parse = async (data: FormData) => {
    const file: File | null = data.get('file') as unknown as File

    if (!file) throw new Error('No file uploaded')

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    pdf(buffer)
        .then(async data => data)
        .catch(err => { throw new Error(err) })

    return { success: true, data }
}

export default parse