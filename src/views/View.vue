<script setup>
import { Icon } from "@iconify/vue";
import { uid } from "uid";
import { ref, computed } from "vue";
import Creator from "../components/Creator.vue";
import TodoItem from "../components/Item.vue";

const todoList = ref([]);
const productList = ref([]);

const fetchTodoList = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
  if (savedTodoList) {
    todoList.value = savedTodoList;
  }
};

// Fetch Todo's on page load
fetchTodoList();

const setTodoListLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const createTodo = (todo) => {
  todoList.value.push({
    id: uid(),
    todo,
    isCompleted: false,
    isEditing: null,
  });
  setTodoListLocalStorage();
};

const createProduct=(product)=>{
console.log('create product ', product);
  productList.push({
    product
  })
};

const deleteTodo = (todo) => {
  todoList.value = todoList.value.filter(
    (todoFilter) => todoFilter.id !== todo.id
  );
  setTodoListLocalStorage();
};

const deleteProduct=(product)=>{
  productList.value = productList.value.filter(
    (productFilter) => productFilter.id != product.id
  );
};
</script>

<template>
  <main>
    <!-- <h1>Create Todo</h1> -->
    <Creator @create-todo="createTodo" @creat-product="">
      <template #button-content>Přidej</template>
    </Creator>
    <ul class="todo-list" v-if="todoList.length > 0">
      <TodoItem v-for="(todo, index) in todoList" :todo="todo" :product="product" :index="index"
        @delete-todo="deleteTodo" /> </ul>
    <ul class="product-list" v-if="productList.length > 0">
      <TodoItem v-for="(product, index) in productList" :todo="todo" :product="product" :index="index"
        @delete-product="deleteProduct" />
    </ul>
    <p v-else class="todos-msg">
      <Icon icon="noto-v1:sad-but-relieved-face" />
      <span>You have no todo's to complete! Add one!</span>
    </p>
    <p v-if="todosCompleted && todoList.length > 0" class="todos-msg">
      <Icon icon="noto-v1:party-popper" />
      <span>You have completed all your todos!</span>
    </p>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>