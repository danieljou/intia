/** @format */

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
	useDeleteClientMutation,
	useGetClientsQuery,
} from "../store/api/MainApi";
import { Client, Client as SS } from "../interfaces/mainInterfaces";
import { Dialog, IconButton } from "@mui/material";
import { useState } from "react";
import ClientForm from "../components/ClientForm";
import { CgClose, CgCloseR, CgEye, CgSpinner } from "react-icons/cg";
import { BiPencil, BiTrash } from "react-icons/bi";
import ClientEditForm from "../components/ClientEditForm";
const Clients = () => {
	const { data, isSuccess, isLoading, refetch } = useGetClientsQuery();
	const [Delete] = useDeleteClientMutation();
	const [isOpp, setisOpp] = useState(false);
	const [selected, setSelected] = useState<number | null>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const columns: GridColDef<SS[number]>[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "nom",
			headerName: "Non",
			width: 150,
		},
		{
			field: "prenom",
			headerName: "Prénom",
			width: 150,
		},
		{
			field: "adresse",
			headerName: "adresse",
			width: 150,
		},
		{
			field: "pays",
			headerName: "pays",
			width: 110,
		},
		{
			field: "telephone",
			headerName: "Télephone",
			width: 180,
		},
		{
			field: "email",
			headerName: "Email",
			width: 200,
		},

		{
			field: "Action",
			width: 200,
			renderCell: (row) => {
				const id = row.id;

				return (
					<div className="flex gap-4 pr-4">
						<IconButton
							onClick={() => {
								Delete(id as unknown as number);
								refetch();
							}}>
							<BiTrash />
						</IconButton>
						<IconButton
							onClick={() => {
								setisOpp(true);
								setSelected(row.row.id as number);
								console.log(row.row.id);
							}}>
							<BiPencil />
						</IconButton>
						<IconButton>
							<CgEye />
						</IconButton>
					</div>
				);
			},
		},
	];
	return (
		<div>
			<Dialog open={isOpp} fullWidth>
				<div className="p-4">
					<div className="flex justify-end">
						<IconButton onClick={() => setisOpp(false)}>
							<CgCloseR />
						</IconButton>
					</div>
					{selected !== null && (
						<ClientEditForm
							client={
								data?.filter(
									(datas) => datas.id == selected
								)[0] as unknown as Client
							}
						/>
					)}
				</div>
			</Dialog>
			<div className="flex justify-end  ">
				<button
					onClick={() => setIsOpen(true)}
					className="px-4 py-2 bg-blue-500 text-white">
					Ajouter
				</button>
			</div>
			<Dialog open={isOpen} fullWidth>
				<div className="p-4">
					<div className="flex justify-end">
						<IconButton onClick={() => setIsOpen(false)}>
							<CgClose />
						</IconButton>
					</div>
					<div className="w-full">
						<ClientForm />
					</div>
				</div>
			</Dialog>
			{isLoading && (
				<div className="flex justify-center animate-spin">
					{" "}
					<CgSpinner size={100} />{" "}
				</div>
			)}
			<div className="text-2xl font-bold my-5">Clients</div>

			<div className="my-5">
				{isSuccess && (
					<DataGrid
						rows={data ? data : []}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5]}
						checkboxSelection
						disableRowSelectionOnClick
					/>
				)}
			</div>
		</div>
	);
};

export default Clients;
