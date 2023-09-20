import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cloudinaryFolder = 'can'; // Reemplaza con el nombre de tu carpeta en Cloudinary
  const cloudinaryApiUrl = `https://api.cloudinary.com/v1_1/test-can/resources/image/folder/${cloudinaryFolder}?max_results=50`; // Reemplaza 'tu_cloud_name' con tu nombre de nube de Cloudinary

  try {
    // Realiza la solicitud HTTP a la API de Cloudinary
    const response = await fetch(cloudinaryApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 212968211892683', // Reemplaza 'tu_api_key' con tu API Key de Cloudinary
      },
    });

    if (response.status !== 200) {
      throw new Error('Error al obtener recursos de Cloudinary');
    }

    const data = await response.json();

    // Devuelve la información de los recursos de la carpeta
    console.log(data)
    res.status(200).json(data.resources);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener recursos de Cloudinary' });
  }
};
