defmodule PhoenixAppWeb.RoomChannelTest do
  use PhoenixAppWeb.ChannelCase

  alias PhoenixAppWeb.RoomChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(RoomChannel, "room:lobby")

    {:ok, socket: socket}
  end

  test "new_msg broadcasts to room:lobby", %{socket: socket} do
    push(socket, "new_msg", %{body: "all"})
    assert_broadcast("new_msg", %{body: "all"})
  end
end
