<script setup lang="ts">
	import { useRouter } from "vue-router";
	import headimg from "../../../assets/svg/head-img.svg";
	import { paths } from "../../../composables/User/path";
	import { LogOut } from "../../../composables/User/api";

	const router = useRouter();

	const options = ref([
		{
			label: "前台首页",
			key: "front",
		},
		{
			label: "系统设置",
			key: "setting",
		},
		{
			label: "登出账户",
			key: "logout",
		},
	]);

	function handleSelect(key: string | number) {
		switch (key) {
			case "front":
				window.open(window.location.protocol + "//" + window.location.host);
				break;
			case "setting":
				router.push({
					name: "setting",
				});
				break;
			case "logout":
				LogOut().then(() => {
					router.push({
						name: "login",
					});
				});

			default:
				break;
		}
	}
</script>

<template>
	<div class="panel-header">
		<n-space class="space" justify="space-between">
			<div class="breadcrumb">
				<n-breadcrumb separator=">">
					<n-breadcrumb-item :clickable="false"> 系统</n-breadcrumb-item>
					<n-breadcrumb-item v-for="path in paths"> {{ path.name }}</n-breadcrumb-item>
				</n-breadcrumb>
			</div>
			<n-dropdown trigger="hover" :options="options" @select="handleSelect">
				<div class="head-image">
					<n-avatar size="medium" :src="headimg" round />
					<span class="admin">Admin</span>
				</div>
			</n-dropdown>
		</n-space>
	</div>
</template>

<style>
	.panel-header {
		box-sizing: border-box;
		height: 60px;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		padding-left: 15px;
	}
	.breadcrumb {
		height: 100%;
		display: flex;
		align-items: center;
	}
	.space {
		width: 100%;
	}
	.head-image {
		padding-left: 12px;
		padding-right: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.admin {
		font-weight: 500;
		font-size: 15px;
		padding-left: 8px;
		color: rgb(51, 54, 57);
	}
</style>
