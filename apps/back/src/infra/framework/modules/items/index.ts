import { Elysia, NotFoundError, t } from 'elysia'
import { CreateItemUseCase } from '../../../../use-cases/item/create/create-item.use-case'
import { DeleteItemUseCase } from '../../../../use-cases/item/delete/delete-item.use-case'
import { GetItemUseCase } from '../../../../use-cases/item/get/get-item.use-case'
import { ListItemsUseCase } from '../../../../use-cases/item/list/list-items.use-case'
import { PostgresItemRepository } from '@/infra/framework/data/postgres/item.repository'
import { db } from '@/infra/framework/data/postgres/database'


export const itemsController = new Elysia({ prefix: '/items' })
  .decorate({
    itemRepository: new PostgresItemRepository(db),
  }).decorate(({ itemRepository }) => ({
    createItemUseCase: new CreateItemUseCase(itemRepository),
    deleteItemUseCase: new DeleteItemUseCase(itemRepository),
    getItemUseCase: new GetItemUseCase(itemRepository),
    listItemsUseCase: new ListItemsUseCase(itemRepository),
  }))
  .get('/', async ({ listItemsUseCase }) => {
    const items = await listItemsUseCase.execute()
    return items
  })
  .get('/:id', async ({ params, getItemUseCase }) => {
    const item = await getItemUseCase.execute(params.id)
    if (!item) {
      throw new NotFoundError('Item not found')
    }
    return item
  })
  .post('/', async ({ body: { adminKey, ...body }, createItemUseCase }) => {
    if (adminKey !== process.env.ADMIN_KEY) {
      throw new Error('Invalid admin key')
    }
    const item = await createItemUseCase.execute(body)
    return item
  },
    {
      body: t.Object({
        adminKey: t.String(),
        name: t.String(),
        description: t.String(),
        intelligence: t.Number(),
        strength: t.Number(),
        agility: t.Number(),
        dexterity: t.Number(),
        price: t.Number(),
      }),
    })
  .delete('/:id', async ({ params, body: { adminKey, ...body }, deleteItemUseCase }) => {
    if (adminKey !== process.env.ADMIN_KEY) {
      throw new Error('Invalid admin key')
    }
    await deleteItemUseCase.execute(params.id)
    return { success: true }
  }, {
    body: t.Object({
      adminKey: t.String()
    })
  })