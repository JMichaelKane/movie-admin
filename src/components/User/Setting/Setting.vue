<script setup lang="ts">
	import { useNotification } from "naive-ui";
	import {
		UpdateAccount,
		UpdatePassword,
		GetCollectInterval,
		UpdateCollectInterval,
	} from "../../../composables/User/api";

	const account = ref<string>("");
	const password = ref<string>("");
	const interval = ref<number>(0);
	const loading = ref<boolean>(true);
	const notification = useNotification(); // 通知
	function updateAccount() {
		if (account.value != "") {
			UpdateAccount(account.value).then(() => {
				notification["success"]({
					duration: 2000,
					content: "更新账户",
					meta: "操作成功",
				});
			});
		}
	}
	function updatePassword() {
		if (password.value != "") {
			UpdatePassword(password.value).then(() => {
				notification["success"]({
					duration: 2000,
					content: "更新密码",
					meta: "操作成功",
				});
			});
		}
	}
	function update() {
		UpdateCollectInterval(interval.value).then(() => {
			notification["success"]({
				duration: 2000,
				content: "更新采集间隔",
				meta: "操作成功，请关闭采集后再开启！",
			});
		});
	}
	GetCollectInterval(interval).then(() => {
		loading.value = false;
	});
</script>

<template>
	<div style="height: calc(100vh - 60px)">
		<n-card title="系统设置" size="small">
			<n-card :bordered="false" title="修改用户:" size="small">
				<n-space>
					<n-input v-model:value="account" type="text" placeholder="请输入用户名" />
					<n-button @click="updateAccount()">更新</n-button>
				</n-space>
			</n-card>
			<n-card :bordered="false" title="修改密码:" size="small">
				<n-space>
					<n-input v-model:value="password" type="text" placeholder="请输入密码" />
					<n-button @click="updatePassword()">更新</n-button>
				</n-space>
			</n-card>
			<n-card :bordered="false" title="修改采集间隔:" size="small">
				<n-space>
					<n-input-number v-model:value="interval" :loading="loading" clearable />
					<n-button @click="update">更新</n-button>
				</n-space>
			</n-card>
		</n-card>
	</div>
</template>

<style></style>
