export function getDateTime() {
	const date = new Date();
	const hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
	const namaHari = hari[date.getDay()];
	const tanggal = date.getDate();
	const bulan = date.getMonth() + 1;
	const tahun = date.getFullYear();
	const jam = date.getHours();
	const menit = date.getMinutes();
	const jamFormatted = jam.toString().padStart(2, "0");
	const menitFormatted = menit.toString().padStart(2, "0");
	return `${namaHari} - ${bulan}/${tanggal}/${tahun} - ${jamFormatted}:${menitFormatted}`;
}

export function formatPhone(number) {
	// Hapus semua karakter non-digit
	const cleaned = number.replace(/\D/g, '');

	// Pastikan nomor dimulai dengan '8' (kode lokal Indonesia) dan hapus '0' di depan
	const formatted = cleaned.startsWith('0') ? cleaned.slice(1) : cleaned;

	// Tambahkan kode negara
	const withCountryCode = '+62' + formatted;

	// Format nomor menjadi bagian-bagian
	const part1 = withCountryCode.slice(0, 4); // +62 8
	const part2 = withCountryCode.slice(4, 8); // 56
	const part3 = withCountryCode.slice(8, 12); // 5520
	const part4 = withCountryCode.slice(12); // 7366

	// Gabungkan bagian-bagian dengan format yang diinginkan
	return `${part1} ${part2} - ${part3} - ${part4}`;
} 