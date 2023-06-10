import { ExternalLink } from "@components/ui/Icons";

function Footer() {
	return (
		<footer className="p-5 bg-gray-50 rounded-lg my-5">
			<div className="flex gap-5 justify-center">
				<a className="text-sm font-semibold hover:text-blue-500 flex items-center gap-1" href="#">
					GitHub Repo
					<ExternalLink className="fill-current" width={18} height={18} />
				</a>
			</div>
		</footer>
	);
}

export default Footer;
