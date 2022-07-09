<script setup lang="ts">
	import { h, ref } from "vue";
	import { DataTableColumns, NButton, NSpace, useNotification, NSwitch } from "naive-ui";
	import { AddCircleOutline, FlashOutline, RefreshCircleOutline } from "@vicons/ionicons5";
	import { ShowOrEdit, Source } from "../../../../composables/User/public";
	import { paths } from "../../../../composables/User/path";
	import { sources as data } from "../../../../composables/User/data";
	import {
		GetSources,
		DelSource,
		CreateSource,
		HandleGetting,
	} from "../../../../composables/User/api";

	paths.value = [
		{
			name: "采集源",
			params: null,
			to: "",
		},
	];

	const columns = ref<DataTableColumns<Source>>([
		{
			title: "ID",
			key: "id",
			width: 100,
			align: "center",
		},
		{
			title: "资源库名",
			key: "name",
			width: 150,
			align: "center",
			render(row: Source, index: number) {
				return h(ShowOrEdit, {
					value: row.name,
					onUpdateValue(v: string) {
						data.value[index].name = v;
					},
				});
			},
		},
		{
			title: "地址",
			key: "url",
			align: "center",
			render(row: Source, index: number) {
				return h(ShowOrEdit, {
					value: row.url,
					onUpdateValue(v: string) {
						data.value[index].url = v;
					},
				});
			},
		},
		{
			title: "采集进度",
			key: "complete",
			align: "center",
			width: 100,
			render(row: Source, index: number) {
				return h("div", row.complete ? "已完成" : "未完成");
			},
		},
		{
			title: "采集情况",
			key: "getting",
			align: "center",
			width: 100,
			render(row: Source, index: number) {
				return h(NSwitch, {
					value: row.getting,
					onUpdateValue: (value: boolean) => {
						HandleGetting(row.id, row.getting).then(() => {
							row.getting = !row.getting;
						});
					},
				});
			},
		},
		{
			title: "操作",
			key: "action",
			width: "300px",
			align: "center",
			render(row: Source, index: number) {
				return h(
					NSpace,
					{
						justify: "center",
					},
					() => [
						h(
							NButton,
							{
								secondary: true,
								type: "info",
								size: "small",
							},
							() => "重新采集"
						),
						[
							row.create
								? h(
										NButton,
										{
											secondary: true,
											type: "info",
											size: "small",
											onClick: () => {
												CreateSource(row.name, row.url).then(() => {
													GetSources();
													notification["success"]({
														duration: 2000,
														content: "保存",
														meta: "操作成功",
													});
												});
											},
										},
										() => "保存"
								  )
								: null,
							,
							h(
								NButton,
								{
									secondary: true,
									type: "error",
									size: "small",
									onClick: () => {
										DelSource(row.id).then(() => {
											GetSources();
											notification["success"]({
												duration: 2000,
												content: "删除",
												meta: "操作成功",
											});
										});
									},
								},
								() => "删除"
							),
						],
					]
				);
			},
		},
	]);
	const notification = useNotification(); // 通知
	function addSource() {
		data.value.push({
			id: 0,
			name: "新建采集源",
			url: "待添加",
			getting: false,
			complete: false,
			create: true,
		});
	}
</script>

<template>
	<n-card title="采集源" size="small">
		<template #header-extra>
			<n-space>
				<n-input placeholder="搜索" :disabled="true" round>
					<template #prefix>
						<n-icon :component="FlashOutline" />
					</template>
				</n-input>
				<div style="display: flex; align-items: center; height: 100%">
					<n-button text type="primary" style="font-size: 24px" @click="addSource()">
						<n-icon>
							<add-circle-outline />
						</n-icon>
					</n-button>
				</div>
				<div style="display: flex; align-items: center; height: 100%">
					<n-button text type="info" style="font-size: 24px" @click="GetSources()">
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
