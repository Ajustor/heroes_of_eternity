import { SkillRepository } from '@/core/domain/repositories/skill.repository'
import { SkillEntity, SkillCreation, skillsTable } from '@hoe/db'
import { and, eq, or } from 'drizzle-orm'
import { OPERATOR } from '@/core/domain/repositories/base.repository'
import { DatabaseConnection } from './database'

export class PostgresSkillRepository implements SkillRepository {
  constructor(private readonly client: DatabaseConnection) { }

  async create(skill: SkillCreation): Promise<SkillEntity> {
    const [createdSkill] = await this.client
      .insert(skillsTable)
      .values(skill)
      .returning()

    return createdSkill
  }

  async findOne(filter: Partial<SkillEntity>, operator: OPERATOR = OPERATOR.OR): Promise<SkillEntity | null> {
    const fieldsFilters = []

    if (filter.id) {
      fieldsFilters.push(eq(skillsTable.id, filter.id))
    }

    if (filter.name) {
      fieldsFilters.push(eq(skillsTable.name, filter.name))
    }

    if (!fieldsFilters.length) {
      return null
    }

    const whereRequest = operator === OPERATOR.OR ? or(...fieldsFilters) : and(...fieldsFilters)

    const [skill] = await this.client
      .select()
      .from(skillsTable)
      .where(whereRequest)

    return skill || null
  }

  async findAll(): Promise<SkillEntity[]> {
    return await this.client
      .select()
      .from(skillsTable)
  }

  async update(id: string, skill: Partial<SkillEntity>): Promise<SkillEntity | null> {
    const [updatedSkill] = await this.client
      .update(skillsTable)
      .set(skill)
      .where(eq(skillsTable.id, id))
      .returning()

    return updatedSkill || null
  }

  async remove(id: string): Promise<void> {
    await this.client
      .delete(skillsTable)
      .where(eq(skillsTable.id, id))
  }
}
