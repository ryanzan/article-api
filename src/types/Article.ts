
export type Article= {
    id?: number,
    title: string,
    content: string,
    image_path: string,
    created_by: number,
    updated_by: number,
    created_at?: Date,
    updated_at?: Date,
}