import React from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Socket } from "phoenix";
import Column from "../components/Column";
import Card from "../components/Card";

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

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  minHeight: "250px",
  padding: "10px"
});

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
      state = move(
        this.state[source.droppableId],
        this.state[destination.droppableId],
        source,
        destination
      );
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
                  <Column title={item.title}>
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                      {this.state[item.status].map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                id={card.id}
                                status={card.status}
                                title={card.title}
                                message={card.message}
                                style={snapshot.isDragging ? "lightgreen" : "grey"}
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
