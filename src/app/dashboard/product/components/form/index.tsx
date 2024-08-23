"use client"

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/app/dashboard/components/button'

import { api } from '@/services/api';
import { GetCookieClient } from '@/lib/cookieClient';

import styles from './styles.module.scss'

interface CategoryProps {
    id: string;
    name: string;
}

interface Props {
    categories: CategoryProps[];
}

export function Form({ categories }: Props) {

    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")

    async function handleRegisterProduct(formData: FormData) {
        const categoryIndex = formData.get('category')
        const name = formData.get('name')
        const price = formData.get('price')
        const description = formData.get('description')

        if(!categoryIndex || !name || !price || !description || !image) {
            return;
        }

        const data = new FormData()

        data.append("file", image)
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("name", name)
        data.append("price", price)
        data.append("description", description)

        const token = GetCookieClient();

        await api.post("/product", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log("CADASTRADO COM SUCESSO")
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                console.log("FORMATO PROIBIDO");
                return;
            }

            setImage(image)
            setPreviewImage(URL.createObjectURL(image)) // ESSA LINHA CRIA UMA URL PARA MOSTRAR A IMAGEM
        }
    }

    return (
        <main className={styles.container}>
            <h1>Novo Produto</h1>

            <form className={styles.form} action={handleRegisterProduct}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color='#fff' />
                    </span>

                    <input
                        type="file"
                        accept='image/png, image/jpg'
                        required
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt='Imagem de preview'
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                        />
                    )}
                </label>

                <select name="category">
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="name"
                    placeholder='Digite o nome do produto'
                    required
                    className={styles.input}
                />

                <input
                    type="text"
                    name="price"
                    placeholder='Preço do produto...'
                    required
                    className={styles.input}
                />

                <textarea
                    name="description"
                    placeholder='Digete a descrição do produto'
                    required
                    className={styles.input}
                ></textarea>

                <Button
                    name='Cadastrar produto'
                />
            </form>
        </main>
    )
}