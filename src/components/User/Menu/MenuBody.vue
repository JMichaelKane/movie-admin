<script setup lang="ts">
	import { menuOptions } from "../../../composables/User/menu";

	const activeKey = ref<string | null>(null);
	const collapsed = ref(false);
</script>

<template>
	<div>
		<n-menu
			v-model:value="activeKey"
			:accordion="false"
			:collapsed-icon-size="22"
			:options="menuOptions"
			mode="vertical"
		/>
	</div>
</template>

<style></style>
