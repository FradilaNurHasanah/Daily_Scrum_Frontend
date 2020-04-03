<template>
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left"><i class="mdi mdi-format-list-bulleted menu-icon"></i></p>
                  <p class="card-description float-right">
                    <a href="#" class="btn btn-sm btn-success btn-icon-text" data-toggle="modal" data-target="#modalDailyScrum">
                      <i class="mdi mdi-plus btn-icon-prepend"></i>
                      Add Activity
                    </a>
                  </p>
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Tanggal</th>
                          <th>Yesterday</th>
                          <th>Today</th>
                          <th>Problem</th>
                          <th>Solution</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Senin, 30 Mar 2020</td>
                          <td>Membuat desain layout aplikasi iklan baris</td>
                          <td>Membuat API aplikasi daily scrum</td>
                          <td>Desain layout masih belum rapi</td>
                          <td>Menambah waktu pengerjaan untuk merapikan layout</td>
                          <td>
                            <a href="#" class="btn btn-sm btn-danger">
                              <i class="mdi mdi-delete btn-icon-prepend"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Selasa, 31 Mar 2020</td>
                          <td>Membuat desain layout aplikasi iklan baris</td>
                          <td>Membuat API aplikasi daily scrum</td>
                          <td>Desain layout masih belum rapi</td>
                          <td>Menambah waktu pengerjaan untuk merapikan layout</td>
                          <td>
                            <a href="#" class="btn btn-sm btn-danger">
                              <i class="mdi mdi-delete btn-icon-prepend"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="modalDailyScrum" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content modal-md">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Add Activity</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="id_siswa" class="col-form-label">Your Team</label>
                    <select class="form-control" name="team" id="team">
                      <option value="BEON" checked>BEON</option>
                      <option value="DDS">DDS</option>
                      <option value="DOT">DOT</option>
                      <option value="node1">Node 1</option>
                      <option value="node2">Node 2</option>
                      <option value="react1">React 1</option>
                      <option value="react2">React 2</option>
                      <option value="laravel">Laravel</option>
                      <option value="laravel_vue">Laravel & Vue</option>
                      <option value="android">Android</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="activity_yesterday" class="col-form-label">Yesterday Activity</label>
                    <textarea name="activity_yesterday" id="activity_yesterday" class="form-control" rows="7" cols="10"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="activity_today" class="col-form-label">Today Activity</label>
                    <textarea name="activity_today" id="activity_today" class="form-control" rows="7" cols="10"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="problem_yesterday" class="col-form-label">Yesterday Problem</label>
                    <textarea name="problem_yesterday" id="problem_yesterday" class="form-control" rows="7" cols="10"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="solution" class="col-form-label">Your Solution</label>
                    <textarea name="solution" id="solution" class="form-control" rows="7" cols="10"></textarea>
                  </div>
                  <div class="form-group">
                    <button type="button" class="btn btn-md btn-success">Submit</button>
                    <button type="button" class="btn btn-md btn-light" data-dismiss="modal">Cancel</button>
                  </div>
                </form>
              </div>
              <div class="modal-footer">                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      id_users: "this.id_users",
      team: "",
      activity_yesterday: "",
      activity_today: "",
      problem_yesterday: "",
      solution: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      dataDaily_Scrum: [],
      daily_scrum: [],
      users: [],
      fields: ["tanggal", "activity_yesterday", "activity_today", "problem_yesterday","solution" ,"Aksi"],
    }
  },
 methods: {
    getData: function() {
        let conf = { headers: { Authorization: "Bearer " + this.key } };
        let offset = (this.currentPage - 1) * this.perPage;
        // let id_users = this.response.data.user.id;
        // this.$bvToast.show("loadingToast");
       this.axios
        .get("/login/check", conf)
        .then(response => {
          this.id_users = response.data.user.id;
          this.axios.get("/Daily_Scrum/" + this.perPage + "/" + offset + "/" + response.data.user.id, conf)
            .then(response => {
              this.status = response.data.status;
              if (response.data.status == 1) {
                this.Daily_Scrum = response.data.daily_scrum;
                console.log(response.data.count);
     
                if (response.data.count == 0) {
                  this.status = 0;
          
                }
              } else {
                console.log("Data Tidak Ditemukan");
          
              }
            })
            // .catch(error => {
            //   console.log(error);
            //   this.loading = false;
            // });
        })
        // .catch(error => {
        //   console.log(error);
        //   this.loading = false;
        // });
      },
    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },
    Add : function(){
      this.action = "insert";
      this.team = "";
      this.activity_yesterday = "";
      this.activity_today = ""; 
      this.problem_yesterday = ""; 
      this.solution = ""; 
      
    },
    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("team", this.team);
        form.append("activity_yesterday", this.activity_yesterday);
        form.append("activity_today", this.activity_today);
        form.append("problem_yesterday", this.problem_yesterday);
        form.append("solution", this.solution);
        this.axios.post("/Daily_Scrum", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let form = {
          team: this.team,
          activity_yesterday: this.activity_yesterday,
          activity_today: this.activity_today,
          problem_yesterday: this.problem_yesterday,
          solution: this.solution
        }
        this.axios.put("/Daily_Scrum/" + this.id, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    Drop : function(id){
      let conf = { headers: { "Authorization" : "Bearer " + this.key} };
      if(confirm('Apakah anda yakin ingin menghapus data ini?')){
        this.$bvToast.show("loadingToast");
        this.axios.delete("/Daily_Scrum/" + id, conf)
        .then(response => {
            this.getData();
            this.$bvToast.hide("loadingToast");
            this.message = response.data.message;
            this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>