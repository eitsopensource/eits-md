import java.net.MalformedURLException;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.util.resource.Resource;

public class Main extends ResourceHandler {

	/**
	 * 
	 */
	@Override
	public Resource getResource(String path) throws MalformedURLException {
		Resource resource = Resource.newClassPathResource(path);
		
		if (resource == null || !resource.exists()) {
			resource = Resource.newClassPathResource("META-INF/resources"+ path);
		}
		return resource;
	}

	/**
	 * 
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		Server server = new Server(8080);

		final Main handler = new Main();
		handler.setWelcomeFiles(new String[]{"index.html"});
		handler.setResourceBase("/");

		server.setHandler(handler);

		server.start();
		server.join();
	}
}