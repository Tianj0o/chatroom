import { defineComponent, ref, StyleValue, Transition, watch } from "vue";
import User from "@/store/user";
import "./Home.css";
export default defineComponent({
  setup() {
    const styleValue: StyleValue = {
      backgroundImage: 'url("../src/assets/1.jpg")',
    };
    const inputRef = ref<HTMLElement>();
    const message = ref("");
    function handleChange() {
      message.value = inputRef.value!.innerHTML;
    }
    const isLoading = ref(false);
    watch(message, (newMessage) => {
      if (newMessage.length > 0) {
        setTimeout(() => {
          isLoading.value = true;
        }, 300);
      } else if (newMessage.length === 0) {
        isLoading.value = false;
      }
    });
    return () => {
      return (
        <>
          <div
            class="Home h-full bg-cover flex flex-col overflow-hidden bg-no-repeat"
            style={styleValue}
          >
            <div class="h-1/10">header</div>
            <div class="flex-1 overflow-y-scroll">Container</div>
            <div class="h-1/14 flex items-center text-2xl p-y-2">
              <div class="border-white border-3 p-1 rounded-full m-4">
                <div class="i-mdi-contactless-payment bg-white"></div>
              </div>
              <div
                contenteditable="true"
                class="bg-white w-3/5 outline-none p-2  flex  break-all text-blue rounded-2"
                onInput={handleChange}
                ref={inputRef}
              ></div>
              <div class={"flex items-center justify-center w-3/10 h-full"}>
                {message.value.length == 0 ? (
                  <div
                    class={
                      "flex items-center justify-center w-3/10 h-full w-full"
                    }
                  >
                    <div class="i-mdi-emoticon-happy-outline bg-white p-2 m-x-2"></div>
                    <div class="border-white border-3 rounded-full m-x-1">
                      <div class=" text-white border-white h-7 w-7 text-center flex items-center justify-center">
                        +
                      </div>
                    </div>
                  </div>
                ) : (
                  // <div class="sendBtnContainer">
                  <div id="sendBtn" class={isLoading.value ? "active " : ""}>
                    发送
                  </div>
                  // </div>
                )}
              </div>
            </div>
          </div>
        </>
      );
    };
  },
});
