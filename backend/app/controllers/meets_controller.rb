class MeetsController < ApplicationController
  before_action :set_meet, only: [:show, :update, :destroy]

  # GET /meets
  def index
    @meets = Meet.all.reverse_order

    render json: @meets, include: [:comments]
  end

  # GET /meets/1
  def show
    render json: @meet, include: [:comments]
  end

  # POST /meets
  def create
    @meet = Meet.new(meet_params)

    if @meet.save
      render json: @meet, status: :created, location: @meet
    else
      render json: @meet.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meets/1
  def update
    if @meet.update(meet_params)
      render json: @meet
    else
      render json: @meet.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meets/1
  def destroy
    @meet.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meet
      @meet = Meet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def meet_params
      params.require(:meet).permit(:date_time, :location, :title, :image, :owner, :secret_code)
    end
end
