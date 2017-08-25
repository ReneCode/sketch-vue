<template>
 <div>
   <p>
   Show: {{project.name}} 
   </p>
  </div>
</template>

<script>
export default {
  props: ['id'],

  computed: {
    project() {
      return this.$store.getters.project(this.id);
    }
  }
}

</script>