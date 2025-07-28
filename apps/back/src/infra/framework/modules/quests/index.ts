import Elysia, { t } from 'elysia'
import { PostgresQuestRepository } from '../../data/postgres/quest.repository'
import { db } from '../../data/postgres/database'
import { ListQuestsUseCase } from '../../../../use-cases/quest/list/list-quests.use-case'
import { CreateQuestUseCase } from '../../../../use-cases/quest/create/create-quest.use-case'
import { PostgresRewardRepository } from '@/infra/framework/data/postgres/reward.repository'
import { DeleteQuestUseCase } from '../../../../use-cases/quest/delete/delete-quest.use-case'
import { GetQuestUseCase } from '../../../../use-cases/quest/get/get-quest.use-case'

export const questsModule = new Elysia({ prefix: 'quests' })
  .decorate({ questsRepository: new PostgresQuestRepository(db), rewardRepository: new PostgresRewardRepository(db) })
  .decorate(({ questsRepository, rewardRepository }) => {
    return {
      listQuestsUsecase: new ListQuestsUseCase(questsRepository, rewardRepository),
      createQuestUsecase: new CreateQuestUseCase(questsRepository, rewardRepository),
      deleteQuestUsecase: new DeleteQuestUseCase(questsRepository, rewardRepository),
      getQuestUsecase: new GetQuestUseCase(questsRepository, rewardRepository),
    }
  })
  .get('', async ({ listQuestsUsecase }) => listQuestsUsecase.execute())
  .post('', async ({ createQuestUsecase, body: { adminKey, ...body }, set }) => {
    try {
      if (adminKey !== process.env.ADMIN_KEY) {
        throw new Error('Invalid admin key')
      }
      await createQuestUsecase.execute(body.name, body.description, body.rewards)
      set.status = 201
    } catch (error) {
      set.status = 409
      throw new Error('An error occurred while creating the quest', {
        cause: error?.message,
      })
    }
  }, {
    body: t.Object({
      adminKey: t.String(),
      name: t.String(),
      description: t.String(),
      rewards: t.Array(t.Object({
        itemId: t.String(),
        amount: t.Number(),
      })),
    }),
  })
  .get('/:questId', async ({ getQuestUsecase, params: { questId } }) => getQuestUsecase.execute(questId), {
    params: t.Object({
      questId: t.String(),
    })
  })
  .delete('', async ({ deleteQuestUsecase, query: { adminKey, ...query } }) => {
    try {
      if (adminKey !== process.env.ADMIN_KEY) {
        throw new Error('Invalid admin key')
      }
      await deleteQuestUsecase.execute(query.id)
    } catch (error) {
      throw new Error('An error occurred while deleting the quest', {
        cause: error?.message,
      })
    }
  }, {
    query: t.Object({
      adminKey: t.String(),
      id: t.String(),
    }),
  })
