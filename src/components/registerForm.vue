<script>
import { registerUser } from "../api";
import { notification } from "ant-design-vue";

export default {
  data() {
    return {
      formState: {
        studentFullName: "",
        studentEmail: "",
        studentClass: 1,
        parentFullName: "",
        parentEmail: "",
        parentPhone: "",
      },
      rules: {
        studentFullName: [
          {
            required: true,
            validator: this.fullNameValidate,
            trigger: "change",
          },
          { min: 6, message: "В поле должно быть не менее 6 символов" },
        ],
        parentFullName: [
          {
            required: true,
            validator: this.fullNameValidate,
            trigger: "change",
          },
          { min: 6, message: "В поле должно быть не менее 6 символов" },
        ],
        studentEmail: [{ required: true, type: "email" }],
        parentEmail: [{ required: true, type: "email" }],
        parentPhone: [
          {
            required: true,
            validator: this.phoneLenght,
            trigger: "blur",
          },
        ],
        studentClass: [{ required: true }],
      },
      classes: new Array(11).fill(1).map.call("_".repeat(11), (a, i) => i + 1),
      validateMessages: {
        required: "Поле обязательно для заполнения",
        types: {
          email: "Введите настоящую почту",
        },
      },
    };
  },
  methods: {
    async onFinish(values) {
      const response = await registerUser(values);
      if (response.status == 200) {
        notification["success"]({
          message: "",
          description: "Пользователь удачно создан.",
        });
      } else {
        notification["error"]({
          message: "Ошибка",
          description: "Ошибка при создании пользователя. Попробуйте позже.",
        });
      }
    },
    fullNameValidate(a) {
      const name = this.formState[a.field].replace(/[^a-zA-ZА-Яа-я ]/g, "");
      this.formState[a.field] = name;
      if (name) {
        const validate = name.split(" ");
        if (validate.length < 2) {
          return Promise.reject("Введите Имя и Фамилию");
        } else {
          if (validate[0].length > 3 && validate[1].length > 3) {
            return Promise.resolve();
          } else {
            return Promise.reject("Введите корректные Имя и Фамилию");
          }
        }
      } else {
        return Promise.reject("Поле обязательно для заполнения");
      }
    },
    phoneLenght() {
      const phone = this.formState.parentPhone.replace(/\D/g, "");
      if (phone.length == 0) {
        return Promise.reject("Поле обязательно для заполнения");
      } else if (phone.length < 11) {
        return Promise.reject("Неккоретная длина номера телефона");
      }
      return Promise.resolve();
    },
    phoneValidate(a) {
      const number = this.formState.parentPhone.replace(/\D/g, "");
      this.formState.parentPhone = number;
      const x = number.match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (x[0]) {
        if (!x[2] && x[1] !== "") {
          this.formState.parentPhone =
            x[1] === "7" ? "+" + x[1] : "+7 (" + x[1];
        } else {
          this.formState.parentPhone = !x[3]
            ? (x[1] ? "+" + x[1] : "") + (x[2] ? " (" + x[2] : "")
            : "+" +
              x[1] +
              " (" +
              x[2] +
              ") " +
              x[3] +
              (x[4] ? "-" + x[4] : "") +
              (x[5] ? "-" + x[5] : "");
        }
      }
    },
  },
};
</script>

<template>
  <a-form
    style=""
    :model="formState"
    :validate-messages="validateMessages"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 8, offset: 1 }"
    autocomplete="off"
    :rules="rules"
    @finish="onFinish"
  >
    <a-form-item label="ФИО ученика" name="studentFullName">
      <a-input
        placeholder="Василий Васильевич Васильев"
        v-model:value="formState.studentFullName"
      />
    </a-form-item>

    <a-form-item label="Электронная почта ученика" name="studentEmail">
      <a-input
        placeholder="example@gmail.com"
        v-model:value="formState.studentEmail"
      />
    </a-form-item>

    <a-form-item label="Класс" name="studentClass">
      <a-select
        v-model:value="formState.studentClass"
        placeholder="Выберите класс ученика"
      >
        <a-select-option v-for="clas in classes" :key="clas" :value="clas"
          >{{ clas }} класс</a-select-option
        >
      </a-select>
    </a-form-item>

    <a-form-item label="Фио родителя" name="parentFullName">
      <a-input
        placeholder="Василий Васильевич Васильев"
        v-model:value="formState.parentFullName"
      />
    </a-form-item>

    <a-form-item label="Электронная почта родителя" name="parentEmail">
      <a-input
        placeholder="example@gmail.com"
        v-model:value="formState.parentEmail"
      />
    </a-form-item>

    <a-form-item label="Телефон родителя" name="parentPhone">
      <a-input
        @input="phoneValidate"
        placeholder="+7 (111) 111-11-11"
        v-model:value="formState.parentPhone"
        type="tel"
      />
    </a-form-item>

    <a-form-item
      :wrapper-col="{ xs: { offset: 1, span: 8 }, sm: { offset: 9, span: 8 } }"
    >
      <a-button type="primary" html-type="submit">Зарегистрироваться</a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="scss" scoped></style>
