<script setup lang="ts">
	import { DataTableColumns, NButton, NSpace, NSwitch } from "naive-ui";
	import { Class } from "../../../../composables/User/public";
	import { AddCircleOutline, FlashOutline, RefreshCircleOutline } from "@vicons/ionicons5";

	const data = ref<Class[]>([
		{
			id: 1,
			name: "动作片",
			get: true,
			categoryId: 1,
		},
	]);

	const d = ref(false);

	const columns = ref<DataTableColumns<Class>>([
		{
			title: "ID",
			key: "id",
			width: 100,
			align: "center",
		},
		{
			title: "名字",
			key: "name",
			align: "center",
		},
		{
			title: "是否采集",
			key: "get",
			width: 200,
			align: "center",
			render(row: Class, index: number) {
				return h(NSwitch, {
					value: row.get,
					onUpdateValue: (value: boolean) => {
						row.get = value;
					},
				});
			},
		},
		{
			title: "所属分类",
			key: "categoryId",
			width: 200,
			align: "center",
		},
	]);
	setTimeout(() => {
		console.log(data.value);
	}, 5000);
</script>

<template>
	<n-card title="分类管理" size="small">
		<template #header-extra>
			<n-space>
				<n-input placeholder="搜索" round>
					<template #prefix>
						<n-icon :component="FlashOutline" />
					</template>
				</n-input>
				<div style="display: flex; align-items: center; height: 100%">
					<n-button text type="primary" style="font-size: 24px">
						<n-icon>
							<add-circle-outline />
						</n-icon>
					</n-button>
				</div>
				<div style="display: flex; align-items: center; height: 100%">
					<n-button text type="info" style="font-size: 24px">
						<n-icon>
							<refresh-circle-outline />
						</n-icon>
					</n-button>
				</div>
			</n-space>
		</template>
		<n-data-table :columns="columns" :data="data" :bordered="false" :single-line="false" />
	</n-card>
</template>

<style></style>
