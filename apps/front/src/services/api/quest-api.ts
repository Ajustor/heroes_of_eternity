import { client } from './client'

export const listQuests = async function () {
  const { data: quests, error } = await client.quests.get()

  if (error) {
    console.error(error)
    throw error
  }

  return quests
}

export const getQuest = async function (id: string) {
  const { data: quest, error } = await client.quests({ questId: id }).get()
  if (error) {
    console.error(error)
    throw error
  }

  return quest
}

