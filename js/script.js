const Task = document.getElementById("task");
const listContainer = document.getElementById("list_container");
const Btn = document.getElementById("btn");

function addTask() {
  if (Task.value.trim() === "") {
    // تأكد من عدم إضافة مهمة فارغة
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = Task.value; // قم بتعيين قيمة المهمة
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // رمز الإغلاق
    li.appendChild(span);
  }

  Task.value = ""; // امسح الحقل
  saveData(); // احفظ البيانات
}

// إضافة حدث الضغط على زر "Enter"
Task.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask(); // استدعاء الدالة لإضافة المهمة
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked"); // تغيير حالة المهمة
      saveData(); // احفظ البيانات
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove(); // إزالة المهمة
      saveData(); // احفظ البيانات
    }
  },
  false
);

function saveData() {
  // اجمع المهام في مصفوفة
  let tasks = [];
  for (let i = 0; i < listContainer.children.length; i++) {
    // استخدام trim() لتنظيف النصوص
    tasks.push(listContainer.children[i].innerHTML.trim());
  }
  // استخدم join مع فاصل خاص لتجنب تكرار النصوص غير المرغوب فيها
  localStorage.setItem("data", tasks.join("|"));
}

function showTask() {
  let storedData = localStorage.getItem("data");
  if (storedData) {
    const tasksArray = storedData.split("|"); // استخدم الفاصل لتقسيم النص
    listContainer.innerHTML = ""; // قم بتفريغ القائمة أولاً
    tasksArray.forEach((task) => {
      if (task.trim() !== "") {
        // تأكد من عدم إضافة مهام فارغة
        let li = document.createElement("li");
        li.innerHTML = task; // أعد إضافة المهام
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // رمز الإغلاق
        li.appendChild(span);
      }
    });
  }
}

showTask(); // عرض المهام عند تحميل الصفحة
