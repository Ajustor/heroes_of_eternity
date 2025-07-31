import Elysia from "elysia"
import { db } from "../../data/postgres/database"
import { PostgresStepRepository } from "../../data/postgres/step.repository"
import { CreateStepUseCase } from "../../../../use-cases/step/create/create-step.use-case"
import { DeleteStepUseCase } from "../../../../use-cases/step/delete/delete-step.use-case"
import { GetStepUseCase } from "../../../../use-cases/step/get/get-step.use-case"
import { ListStepsUseCase } from "../../../../use-cases/step/list/list-steps.use-case"
import { t } from "elysia"
import { BACKGROUNDS_KEYS } from "@hoe/assets"


export const stepsModule = new Elysia({ prefix: 'steps' })
    .decorate({ stepsRepository: new PostgresStepRepository(db) })
    .decorate(({ stepsRepository }) => ({
        createStepUseCase: new CreateStepUseCase(stepsRepository),
        deleteStepUseCase: new DeleteStepUseCase(stepsRepository),
        getStepUseCase: new GetStepUseCase(stepsRepository),
        listStepsUseCase: new ListStepsUseCase(stepsRepository),
    }))
    .get('', async ({ listStepsUseCase }) => listStepsUseCase.execute())
    .get('/:id', async ({ params, getStepUseCase }) => getStepUseCase.execute(params.id))
    .post('', async ({ body: { adminKey, ...body }, createStepUseCase }) => {
        if (adminKey !== process.env.ADMIN_KEY) {
            throw new Error('Invalid admin key')
        }
        const step = await createStepUseCase.execute(body, body.beasts)
        return step
    }, {
        body: t.Object({
            adminKey: t.String(),
            name: t.String(),
            description: t.String(),
            zone: t.Enum(BACKGROUNDS_KEYS),
            beasts: t.Array(t.Object({
                beastId: t.String(),
                count: t.Number(),
            })),
        }),
    })