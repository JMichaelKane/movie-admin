<script setup lang="ts">
	// import { useRouter } from "vue-router";
	// import { baseFetch } from "../composables/User/http";
	import { Login } from "../composables/User/api";
	const loading = ref<boolean>(false);
	const account = ref<string>("");
	const password = ref<string>("");
	// const router = useRouter(); // 路由
	function handleClick() {
		loading.value = true;
		Login(account.value, password.value);
	}
</script>

<template>
	<n-grid cols="1 l:5" responsive="screen">
		<n-grid-item span="1" offset="0 l:2">
			<n-space class="card" justify="center" vertical>
				<n-card title="登录">
					<n-space vertical>
						<div class="form">
							<n-input
								v-model:value="account"
								type="text"
								size="large"
								placeholder="请输入用户名"
							/>
						</div>
						<div>
							<n-input
								v-model:value="password"
								type="password"
								size="large"
								show-password-on="mousedown"
								placeholder="请输入密码"
								:maxlength="8"
							/>
						</div>
						<div class="form">
							<n-space justify="space-between">
								<n-checkbox size="large" label="记住密码" />
								<n-button text> 忘记密码 </n-button>
							</n-space>
						</div>
						<div>
							<n-button
								class="button-block"
								type="primary"
								:loading="loading"
								@click="handleClick"
							>
								登录
							</n-button>
						</div>
					</n-space>
				</n-card>
			</n-space>
		</n-grid-item>
	</n-grid>
</template>

<style>
	.card {
		height: 100vh;
	}
	.form {
		margin-bottom: 10px;
	}
	.button-block {
		width: 100%;
	}
</style>
