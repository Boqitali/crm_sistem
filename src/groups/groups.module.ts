import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupResolver } from './groups.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService, GroupResolver],
})
export class GroupsModule {}
