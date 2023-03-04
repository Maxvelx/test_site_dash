<template>
  <div class="content-wrapper">
    <div class="col-12 py-3 mx-3">
      <router-link :to="{name: 'post.create'}">
        <a class="btn btn-primary">New Post</a>
      </router-link>
    </div>
    <div class="row col-12 mx-2">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Posts list</h3>
          </div>
          <!-- /.card-header -->
          <div style="color: #000" class="py-3">
            <table>
              <thead>
              <tr>
                <th>Action</th>
                <th>Title</th>
                <th>Published</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="post in posts">
                <td>
                  <router-link :to="{name: 'post.edit', params: { id: post.id }}"
                               @click.prevent="this.$store.commit('main/setProps', post)">
                    <a class="text-success" href=""><i class="fas fa-edit"></i></a>
                  </router-link>
                </td>
                <td>{{ post.title }}</td>
                <td>{{ post.is_published === 'true' ? '✅' : '❌' }}</td>
                <td>{{ post.path_image ? '✅' : '❌' }}</td>
                <td>
                  <a class="text-danger" @click.prevent="getDelete(post.id)" style="padding-left: 20px"
                       href=""><i class="fas fa-trash-alt"></i></a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
    <div class="row" v-if="paginate !== null && paginate.total > 10">
      <div class="col-sm-12 col-md-5" style="padding-left: 20px;padding-right: 20px">
        <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
          <ul class="pagination">
            <li v-if="paginate.current_page !== 1" class="page-item">
              <a @click.prevent="getPost(paginate.current_page -1)" class="page-link" href=""
                 tabindex="-1">
                <span class="fa fa-arrow-left"></span></a></li>
            <li v-for="link in paginate.links" :class="link.active ? 'active' : ''" class="page-item"
                aria-current="page">
              <template v-if="Number(link.label)">
                <a @click.prevent="getPost(link.label)" class="page-link" href="">{{ link.label }}
                  <span
                      class="sr-only"></span></a>
              </template>
            </li>
            <li v-if="paginate.current_page !== paginate.last_page" class="page-item">
              <a class="page-link" href="" @click.prevent="getPost(paginate.current_page +1)">
                <span class="fa fa-arrow-right"></span></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "IndexComponent",
  data() {
    return {
      posts: null,
      paginate: null,
    }
  },
  mounted() {
    this.getPost()
  },
  methods: {

    getPost(page = 1) {
      api.get('/api/admin/posts?page=' + page)
          .then(res => {
            this.posts = res.data.data
            this.paginate = res.data
          })
    },

    getDelete(id) {
      api.delete('/api/admin/posts/' + id)
          .then(res => {
            if (res.status === 200) {
              this.getPost()
            }
          })
    },

  },
}
</script>

<style scoped lang="scss">
// sets

$gl-ms: "screen and (max-width: 23.5em)"; // up to 360px
$gl-xs: "screen and (max-width: 35.5em)"; // up to 568px
$gl-sm: "screen and (max-width: 48em)"; // max 768px
$gl-md: "screen and (max-width: 64em)"; // max 1024px
$gl-lg: "screen and (max-width: 80em)"; // max 1280px

// table style

table {
  border-spacing: 1px;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
  position: relative;
  -webkit-box-shadow: 0 18px 60px rgba(23, 26, 33, 0.05);
  -moz-box-shadow: 0 18px 60px rgba(23, 26, 33, 0.05);
  -o-box-shadow: 0 18px 60px rgba(23, 26, 33, 0.05);
  box-shadow: 0 38px 100px rgba(23, 26, 33, 0.2);

  * {
    position: relative
  }

  td, th {
    padding-left: 18px;
    padding-right: 18px;

  }

  thead tr {
    height: 60px;
    background: #f5c34b;
    font-size: 16px;
  }

  tbody tr {
    height: 48px;
    border-bottom: 1px solid #E3F1D5;

    &:last-child {
      border: 0;
    }
  }

  td, th {
    text-align: left;

    &.l {
      text-align: right
    }

    &.c {
      text-align: center
    }

    &.r {
      text-align: center
    }
  }
}


@media #{$gl-xs}              {

  table {
    display: block;

    > *, tr, td, th {
      display: block
    }

    thead {
      display: none
    }

    tbody tr {
      height: auto;
      padding: 8px 0;

      td {
        padding-left: 45%;
        margin-bottom: 12px;

        &:last-child {
          margin-bottom: 30px
        }

        &:before {
          position: absolute;
          font-weight: 700;
          width: 40%;
          left: 10px;
          top: 0
        }

        &:nth-child(1):before {
          content: "Action";
        }

        &:nth-child(2):before {
          content: "Title";
        }

        &:nth-child(3):before {
          content: "Published";
        }

        &:nth-child(4):before {
          content: "Image";
        }

        &:nth-child(5):before {
          content: "Delete";
        }
      }
    }
  }
}


// body style

body {
  background: #9BC86A;
  font: 400 14px 'Calibri', 'Arial';
  padding: 20px;
}

blockquote {
  color: white;
  text-align: center;
}
</style>