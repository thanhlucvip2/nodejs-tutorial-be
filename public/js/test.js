let page = 1;
let size = 10;
let total = 0;

function nextPage() {
  if (size * page > total) {
    return;
  }
  page++;
  myFunction();
}
function prevPage() {
  if (page === 1) {
    return;
  }
  page--;
  myFunction();
}
myFunction();

function myFunction() {
  fetch(`/api/v1/?page=${page}&size=${size}`)
    .then((data) => data.json())
    .then((data2) => {
      document.getElementById("test").innerHTML = data2.item
        .map((item) => {
          return `<div>${item.username}</div>`;
        })
        .join(" ");
      total = +data2.total;
      document.getElementById(
        "total"
      ).innerHTML = `<div>total : ${total} item</div>`;

      setlistpage(Math.ceil(total / size));
      changeSize(total);
    })

    .catch((err) => console.log(err));
}

function setlistpage(page) {
  const list = [];
  for (let index = 0; index < page; index++) {
    list.push(index + 1);
  }

  document.getElementById("pagesize").innerHTML = list
    .map(
      (item) => `<li class="page-item" onclick="getPage(${item})">
    <a class="page-link" href="#">${item}</a>
  </li>`
    )
    .join("");
}

function getPage(item) {
  page = item;
  myFunction();
}

function changeSize(total) {
  const list = [];
  for (let index = 0; index < total; index++) {
    list.push(index + 1);
  }

  document.getElementById("sizePage").innerHTML = list
    .map(
      (item) =>
        ` <li class="page-item">
      <a class="page-link" href="#" onclick="changePageSize(${item})">${item}</a>
    </li>`
    )
    .join("");
}

function changePageSize(pagesize) {
  size = pagesize;
  page = 1;
  console.log(Math.ceil(total / size));
  setlistpage(Math.ceil(total / size));
  myFunction();
}
