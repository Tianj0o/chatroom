import { reactive } from "vue";

interface user {
  name: string;
}

const User = reactive<user>({
  name: "",
});

export default User;
