class Api::TodosController < ApplicationController

  def index
    render json: Todo.all
  end

  def show
    render json: Todo.find(params[:id])
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save!
      render json: todo
    else
      render json: { errors: todo.errors.full_messages }, status: 422
    end
  end

  def update
    todo = Todo.find(params[:id])

    if todo.update!(todo_params) # or update attributes?
      render json: todo
    else
      render json: { errors: todo.errors.full_messages }, status: 422
    end
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy!
    redirect_to root
  end

  private
  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end

end
