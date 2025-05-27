import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Media } from "./entities/media.entity";

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private readonly mediaRepo: Repository<Media>
  ) {}
  create(createMediaDto: CreateMediaDto) {
    return this.mediaRepo.save(createMediaDto);
  }

  findAll() {
    return this.mediaRepo.find();
  }

  findOne(id: number) {
    return this.mediaRepo.findOneBy({ id });
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.mediaRepo.preload({ id, ...updateMediaDto });

    if (!media) {
      console.log(id);
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return this.mediaRepo.save(media);
  }

  remove(id: number) {
    return this.mediaRepo.delete({ id });
  }
}
