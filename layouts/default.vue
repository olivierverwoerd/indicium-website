<template>
	<v-app>
		<Nav />
		<NavMobile />
		<v-main>
			<nuxt />
		</v-main>
		<Footer />
	</v-app>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"

	import Nav from "../components/Nav.vue"
	import NavMobile from "../components/NavMobile.vue"
	import Footer from "../components/Footer.vue"

	@Component({
		components: {
			Nav,
			NavMobile,
			Footer
		}
	})
	export default class Default extends Vue {
	}
</script>
