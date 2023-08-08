import { Project } from '../domain/model/Project';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from '../Dto/CreateProjectDto';
import { CraApplication } from '../domain/application/craApplication';
import { AuthGuard } from '@app/guards/auth.guard';

//@UseGuards(AuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly craApplication: CraApplication) {}

  @Post('add')
  async addProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const project = new Project(
      createProjectDto.code,
      createProjectDto.collabs,
    );
    return await this.craApplication.addProject(project);
  }

  @Get('all')
  async getProjects(): Promise<Project[]> {
    console.log('getting projects back');
    return await this.craApplication.getAllProjects();
  }

  @Get('user/:id')
  async getUserProjects(@Param('id') userId: string): Promise<Project[]> {
    return await this.craApplication.getProjectsByUser(userId);
  }

  @Get('/:id')
  async getById(@Param('id') projectId: string): Promise<Project> {
    return await this.craApplication.getProjectById(projectId);
  }

  @Put('update')
  async updateProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const project = new Project(
      createProjectDto.code,
      createProjectDto.collabs,
    );
    return await this.craApplication.updateProject(project);
  }

  @Get('search/:id')
  async getProjectsSearch(@Param('id') id: string): Promise<Project[]> {
    return await this.craApplication.getProjectsLikeId(id);
  }
}
