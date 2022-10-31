import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {MovieEntity} from '../movie/movie.entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends  defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, minlength: 5, maxlength: 1024})
  public text!: string;

  @prop({required: true, min: 1, max: 10})
  public rating!: number;

  @prop({
    ref: MovieEntity,
    required: true
  })
  public movieId!: Ref<MovieEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
