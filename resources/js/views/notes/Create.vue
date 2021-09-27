<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Make new Note</div>
          <div class="card-body">
            <form action="#" method="post" @submit.prevent="storeNote">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  id="title"
                  v-model="form.title"
                  class="form-control"
                />
                <div
                  class="mt-2 text-danger"
                  v-if="theErrors.title"
                  v-text="theErrors.title[0]"
                ></div>
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <select
                  class="form-control"
                  v-model="form.subject"
                  id="subject"
                >
                  <option
                    v-for="subject in subjects"
                    :key="subject.id"
                    :value="subject.id"
                    v-text="subject.name"
                  ></option>
                </select>
                <div v-if="theErrors.subject" class="mt-2 text-danger">
                  {{ theErrors.subject[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  v-model="form.description"
                  id="description"
                  rows="5"
                  class="form-control"
                ></textarea>
                <div v-if="theErrors.description" class="mt-2 text-danger">
                  {{ theErrors.description[0] }}
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary d-flex align-items-center"
              >
                Save
                <template v-if="loading">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="
                      margin: auto;
                      background: none;
                      display: block;
                      shape-rendering: auto;
                    "
                    width="30px"
                    height="22px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                  >
                    <rect x="17.5" y="30" width="15" height="40" fill="#85a2b6">
                      <animate
                        attributeName="y"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="18;30;30"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.2s"
                      ></animate>
                      <animate
                        attributeName="height"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="64;40;40"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.2s"
                      ></animate>
                    </rect>
                    <rect x="42.5" y="30" width="15" height="40" fill="#bbcedd">
                      <animate
                        attributeName="y"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="20.999999999999996;30;30"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.1s"
                      ></animate>
                      <animate
                        attributeName="height"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="58.00000000000001;40;40"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.1s"
                      ></animate>
                    </rect>
                    <rect x="67.5" y="30" width="15" height="40" fill="#dce4eb">
                      <animate
                        attributeName="y"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="20.999999999999996;30;30"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                      ></animate>
                      <animate
                        attributeName="height"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="58.00000000000001;40;40"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                      ></animate>
                    </rect>
                  </svg>
                </template>
              </button>
            </form>
          </div>
          <div class="card-footer">
            <router-link to="/notes/table" class="mr-3 btn btn-sm btn-secondary"
              >Back to List</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        subject: "",
      },
      subjects: [],
      theErrors: [],
      loading: false,
    };
  },
  methods: {
    // get subjects from API
    async getSubjects() {
      let response = await axios.get("/api/subjects");
      if (response.status === 200) {
        this.subjects = response.data;
      }
    },
    // store form create note
    async storeNote() {
      this.loading = true;
      try {
        let response = await axios.post(
          "/api/notes/create-new-note",
          this.form
        );
        if (response.status === 200) {
          (this.form.title = ""),
            (this.form.subject = ""),
            (this.form.description = ""),
            (this.theErrors = []),
            (this.loading = false);
          this.$toasted.show(response.data.message, {
            type: "success",
            icon: "check-double",
            duration: 3000,
            position: "top-center",
            theme: "bubble",
          });
          this.$router.push("/notes/table");
        }
      } catch (error) {
        this.loading = false;
        this.$toasted.show("Something went wrong.", {
          type: "error",
          icon: "times",
          duration: 3000,
          position: "top-center",
          theme: "bubble",
        });
        this.theErrors = error.response.data.errors;
      }
    },
  },
  mounted() {
    this.getSubjects();
  },
};
</script>