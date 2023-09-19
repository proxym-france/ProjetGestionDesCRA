import { INestApplication } from '@nestjs/common';
import { CraApplication } from '@app/domain/application/craApplication';
import { CreateActivityDto } from '@app/dtos/CreateActivityDto';
import { Project } from '@app/domain/model/Project';
import { ProjetStatus } from '@app/domain/model/projetStatus.enum';
import { CreateAbsenceDto } from '@app/dtos/CreateAbsenceDto';
import { Raison } from '@app/domain/model/Raison';
import { CollabRepository } from '@app/repositories/collab.repository';
import { ProjectRepository } from '@app/repositories/project.repository';
import { Collab } from '@app/domain/model/Collab';
import { Role } from '@app/domain/model/Role';

export async function prepareActivity(
  app: INestApplication,
  date: Date,
  clientId: string,
  insertUser = true,
) {
  if (insertUser) {
    await createUser(app, clientId);
  }
  const application = app.get(CraApplication);
  const activity = new CreateActivityDto();
  const project = await createProject(app, clientId);
  activity.date = date;
  activity.matin = true;
  activity.projectId = project.code;
  activity.collabId = clientId;
  await application.addActivity(activity);
  return activity;
}

export async function createProject(app: INestApplication, clientId: string) {
  const repo: ProjectRepository = app.get('IRepoProject');
  const repoCollab: CollabRepository = app.get('IRepoCollab');
  const createdUser = await repoCollab.findById(clientId);
  const project = new Project(
    'code',
    [createdUser.email],
    '',
    '',
    new Date(),
    ProjetStatus.Active,
  );
  await repo.save(project);
  return project;
}

export async function createUser(app: INestApplication, userId: string) {
  const repo: CollabRepository = app.get('IRepoCollab');
  await repo.save(new Collab(userId, 'some name', 'last name', Role.user));

  return repo;
}

export async function prepareAbsence(
  app: INestApplication,
  clientId: string,
  insertUser = true,
) {
  if (insertUser) {
    await createUser(app, clientId);
  }
  const date = new Date();
  const application = app.get(CraApplication);
  const absence = new CreateAbsenceDto();
  absence.date = date;
  absence.matin = false;
  absence.raison = Raison.Maladie;

  absence.collabId = clientId;
  await application.addAbsence(absence);
  return absence;
}
