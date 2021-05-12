require "test_helper"

class MeetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @meet = meets(:one)
  end

  test "should get index" do
    get meets_url, as: :json
    assert_response :success
  end

  test "should create meet" do
    assert_difference('Meet.count') do
      post meets_url, params: { meet: { date: @meet.date, image: @meet.image, location: @meet.location, owner: @meet.owner, time: @meet.time, title: @meet.title } }, as: :json
    end

    assert_response 201
  end

  test "should show meet" do
    get meet_url(@meet), as: :json
    assert_response :success
  end

  test "should update meet" do
    patch meet_url(@meet), params: { meet: { date: @meet.date, image: @meet.image, location: @meet.location, owner: @meet.owner, time: @meet.time, title: @meet.title } }, as: :json
    assert_response 200
  end

  test "should destroy meet" do
    assert_difference('Meet.count', -1) do
      delete meet_url(@meet), as: :json
    end

    assert_response 204
  end
end
