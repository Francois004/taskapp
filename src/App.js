import { useState, useEffect } from "react";
import "./App.css";
import * as Icon from "react-feather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import Modal from "react-modal";
import moment from "moment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 500,
    height: 500,
  },
};

function App() {
  const [title, setTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [user, setUser] = useState("");
  const [startDate, setStartDate] = useState("07-08-2023");
  const [modalOpen, setModalOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [tasks, setTasks] = useState([
    {
      title: "Rencontre des clients",
      id: "1",
      user: "nere dossa",
      date: "09-09-23",
      status: "encours",
    },
    {
      title: "Développement du Projet",
      id: "2",
      user: "nere dossa",
      date: "09-09-23",
      status: "encours",
    },
    {
      title: "Braintorming",
      id: "3",
      user: "nere dossa",
      date: "09-09-23",
      status: "a venir",
    },
  ]);
  const tasksData = [
    {
      title: "Rencontre des clients",
      id: "1",
      user: "nere dossa",
      date: "09-09-23",
      status: "encours",
    },
    {
      title: "Développement du Projet",
      id: "2",
      user: "nere dossa",
      date: "09-09-23",
      status: "encours",
    },
    {
      title: "Braintorming",
      id: "3",
      user: "nere dossa",
      date: "09-09-23",
      status: "a venir",
    },
  ];

  function saveTask() {
    let taskss = tasks;
    const task = {
      title: title,
      startDate: startDate,
      user: user,
      id: "",
      status: "avenir",
    };
    console.log(task);
    taskss.push(task);
    setTasks(taskss);
    setModalOpen(false);
    setTitle("");
    setUser("");
    setStartDate("");
  }
  function deleteTask(ind) {
    let taskss = [...tasks];
    taskss.splice(ind, 1);
    setTasks(taskss);
    console.log(ind);
  }
  function editTask(ind) {
    setEditable(!editable);
    const task = {
      title: title,
      startDate: startDate,
      user: user,
      id: tasks[ind].id,
      status: taskStatus,
    };
    let taskss = tasks;
    taskss[ind] = task;
    setTasks(taskss);
    setTitle("");
    setUser("");
    setStartDate("");
  }

  function filterTask(search) {
    let taskss = tasksData.filter((task) => {
      return (
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.status.toLowerCase().includes(search.toLowerCase())
      );
    });
    setTasks(taskss);
  }

  return (
    <div class="container mt-3">
      <div className="row m-2">
        <div className="col-4 ">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Filtrer..."
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={(event) => filterTask(event.target.value)}
            />
            <span className="input-group-text border-0" id="search-addon">
              <Icon.Search />
            </span>
          </div>
        </div>
        <div className="col-6">
          <button className="btn btn-primary" onClick={setModalOpen}>
            Nouvelle tâche
          </button>
        </div>
      </div>

      <Modal isOpen={modalOpen} style={customStyles}>
        <div>
          <div className="card-title fw-bold">Ajouter une nouvelle tâche</div>
          <div className="container">
            <div className=" row mb-3">
              <div className="col-6">
                <label htmlFor="FormControlInput1" className="form-label">
                  Titre de la tâche
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="FormControlInput1"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <div className="col-6">
                <label htmlFor="FormControlDate1" className="form-label">
                  Utilisateur
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="FormControlInput1"
                  onChange={(e) => setUser(e.target.value)}
                ></input>
              </div>
            </div>
            <div className=" row mb-3">
              <div className="col-6">
                <label htmlFor="FormControlInput1" className="form-label">
                  Date de début
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="FormControlInput1"
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-6 m-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => saveTask()}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>

        <button onClick={() => setModalOpen(false)}>Close Modal</button>
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th>Tâche</th>
            <th>Utilisateur</th>
            <th>Date de début</th>
            <th>Statut</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>
                <span
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                  onInput={(e) => setTitle(e.target.innerText)}
                >
                  {task.title}
                </span>
              </td>

              <td>
                <span
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                  onInput={(e) => setUser(e.target.innerText)}
                >
                  {task.user}
                </span>
              </td>
              <td>
                {editable ? (
                  <input
                    type="date"
                    className="form-control"
                    id="FormControlInput1"
                    onChange={(e) => setStartDate(e.target.value)}
                  ></input>
                ) : (
                  <span>{moment(task.date).format("D/MM/YYYY")}</span>
                )}
              </td>
              <td>
                {!editable ? (
                  <span>
                    {task.status == "encours" ? (
                      <td>En cours</td>
                    ) : task.status == "avenir" ? (
                      <td>A venir</td>
                    ) : (
                      <td>En attente</td>
                    )}
                  </span>
                ) : (
                  <select
                    className="form-select"
                    onChange={(event) => setTaskStatus(event.target.value)}
                  >
                    <option value="enattente">En attente</option>
                    <option value="encours">En cours</option>
                    <option value="avenir">A venir</option>
                  </select>
                )}
              </td>

              <td>
                <Icon.Edit className="aclick" onClick={() => editTask(index)} />
              </td>
              <td>
                <Icon.Trash
                  className="aclick"
                  onClick={() => deleteTask(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
