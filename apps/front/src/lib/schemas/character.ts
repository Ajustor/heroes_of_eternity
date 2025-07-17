import { z } from 'zod'

export const newCharacterSchema = z.object({
    name: z.string({
        required_error: 'Merci d\'entrer un nom de personnage'
    }),
})

export type NewCharacterSchema = typeof newCharacterSchema


export const updateCharacterSchema = z.object({
    characterId: z.string(),

})

export type UpdateCharacterSchema = typeof updateCharacterSchema