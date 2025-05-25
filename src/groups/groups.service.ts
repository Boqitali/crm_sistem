import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>
  ) {}
  create(createGroupDto: CreateGroupDto) {
    return this.groupRepo.save(createGroupDto);
  }

  findAll() {
    return this.groupRepo.find();
  }

  findOne(id: number) {
    return this.groupRepo.findOneBy({id});
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const result = await this.groupRepo.update(id, updateGroupDto)
    if(result.affected === 0){
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return this.groupRepo.findOne({where: {id }});
  }

  remove(id: number) {
    return this.groupRepo.delete({id});
  }
}
