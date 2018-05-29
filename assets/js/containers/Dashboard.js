import React from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Socket } from "phoenix";
import Column from "../components/Column";
import Card from "../components/Card";
import { reorder, move } from "../lib/Lists";

const STATUSES = [
  {
    status: "to_meet",
    title: "A rencontrer"
  },
  {
    status: "meeting",
    title: "Entretien"
  }
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to_meet: [
        {
          id: 1,
          status: "to_meet",
          title: "Sébastien Cesbron",
          message: "Full stack developer"
        }
      ],
      meeting: [
        {
          id: 2,
          status: "meeting",
          title: "Jean Dupont",
          message: "Front developer"
        }
      ]
    };
    let socket = new Socket("/socket", {
      params: { token: window.userToken }
    });
    socket.connect();

    this.channel = socket.channel("card:lobby", {});
  }

  componentDidMount() {
    this.channel.join().receive("ok", response => {
      console.log("Joined successfully", response);
    });
    this.channel.on("shout", payload => {
      this.setState(payload.body);
    });
  }

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    let state = {};
    if (source.droppableId === destination.droppableId) {
      state[source.droppableId] = reorder(
        this.state[source.droppableId],
        source.index,
        destination.index
      );
    } else {
      result = move(
        this.state[source.droppableId],
        this.state[destination.droppableId],
        source.index,
        destination.index
      );
      state[source.droppableId] = result[0];
      state[destination.droppableId] = result[1];
    }
    this.setState(state);
    this.channel.push("shout", { body: state });
  };

  render() {
    return (
      <div className="main-wrapper">
        <div className="header">
          <h1 className="header-title">Dashboard</h1>
          <Link to="/">Accueil</Link>
        </div>
        <div className="dashboard">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {STATUSES.map((item, index) => (
              <Droppable key={index} droppableId={item.status}>
                {(provided, snapshot) => (
                  <Column title={item.title} isDraggingOver={snapshot.isDraggingOver}>
                    <div ref={provided.innerRef} style={{ height: "100%" }}>
                      {this.state[item.status].map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                title={card.title}
                                message={card.message}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </Column>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default Dashboard;
