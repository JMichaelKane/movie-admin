<script setup lang="ts">
	import { useNotification } from "naive-ui";
	import { global } from "../composables/User/api";
	window.$notification = useNotification();
	onBeforeMount(() => {
		global();
	});
</script>

<template>
	<div>
		<n-grid cols="10 l:9" responsive="screen" item-responsive>
			<n-grid-item span="1 l:1">
				<Menu />
			</n-grid-item>
			<n-grid-item span="8">
				<div class="panel">
					<PanelHeader />
					<div class="panel-body">
						<n-scrollbar style="max-height: calc(100vh - 60px)">
							<router-view />
						</n-scrollbar>
					</div>
				</div>
			</n-grid-item>
		</n-grid>
	</div>
</template>

<style>
	.panel {
		height: 100vh;
		background-color: #f6f9f8;
	}
</style>
