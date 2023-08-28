let courseApi = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);
  handelCreateForm();
}
// Đầu tiên
start();

//Function
function getCourses(callback) {
  fetch(courseApi)
    .then((responsse) => {
      return responsse.json();
    })
    .then(callback);
}
function postCourse(data, callback) {
  fetch(courseApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((responsse) => {
      return responsse.json();
    })
    .then(callback);
}
function deleteCourse(idOfCourse) {
  fetch(courseApi + "/" + idOfCourse, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((responsse) => {
      return responsse.json();
    })
    .then(() => {
      let ulE = document.querySelector(`.course__block-${idOfCourse}`);
      ulE.remove();
    });
}
function renderCourses(courses) {
  let listCourseE = document.getElementById("list__courses");
  let htmls = courses.map((element) => {
    return `
        <li class="course__block-${element.id}">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <div class="delete_button">
              <button onclick = "handleDeleteCourse(\'${element.id}\')">Delete</button> 
            </div>
            
        </li>
        `;
  });
  listCourseE.innerHTML = htmls.join("");
}
function handelCreateForm() {
  let createButton = document.querySelector("#button");
  createButton.addEventListener("click", (e) => {
    e.preventDefault();
    let descriptionForm = document.querySelector(
      'input[name="description"]'
    ).value;
    let titleForm = document.querySelector('input[name="title"]').value;
    let formData = {
      title: titleForm,
      description: descriptionForm,
    };
    postCourse(formData, () => {
      document.querySelector('input[name="title"]').value = "";
      document.querySelector('input[name="description"]').value = "";
      getCourses(renderCourses);
    });
  });
}
function handleDeleteCourse(idOfCourse) {
  deleteCourse(idOfCourse);
}
