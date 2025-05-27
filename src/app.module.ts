import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { TeacherGroupsModule } from './teacher_groups/teacher_groups.module';
import { StudentGroupsModule } from './student_groups/student_groups.module';
import { AttendancesModule } from './attendances/attendances.module';
import { SchedulesModule } from './schedules/schedules.module';
import { HomeworksModule } from './homeworks/homeworks.module';
import { GradesModule } from './grades/grades.module';
import { MediaModule } from './media/media.module';
import { HomeworkSubmissionsModule } from './homework_submissions/homework_submissions.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "dist/**/*.entity{.ts,.js"],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    AuthModule,
    AdminModule,
    TeacherModule,
    StudentsModule,
    CoursesModule,
    GroupsModule,
    TeacherGroupsModule,
    StudentGroupsModule,
    AttendancesModule,
    SchedulesModule,
    HomeworksModule,
    GradesModule,
    MediaModule,
    HomeworkSubmissionsModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
