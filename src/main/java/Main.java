import java.net.MalformedURLException;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.util.resource.Resource;
import org.eclipse.jetty.webapp.Configuration;
import org.eclipse.jetty.webapp.MetaInfConfiguration;
import org.eclipse.jetty.webapp.WebAppContext;

public class Main extends ResourceHandler {

	/**
	 * 
	 */
	@Override
	public Resource getResource(String path) throws MalformedURLException {
		Resource resource = Resource.newClassPathResource(path);
		
		if ( resource == null || !resource.exists() ) {
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
		final Server server = new Server(8080);
		
		//-------------------
		final WebAppContext webAppContext = new WebAppContext();
		webAppContext.setContextPath("/");
		
		Configuration[] configs = new Configuration[1];
		configs[0] = new MetaInfConfiguration();
		webAppContext.setConfigurations( configs );
		webAppContext.setParentLoaderPriority(true);
        //webAppContext.setBaseResource(new ResourceCollection(resources));
		
//		DefaultServlet defaultServlet = new DefaultServlet() {
//			private static final long serialVersionUID = -1239684760674097791L;
//
//			@Override
//			public void service(ServletRequest arg0, ServletResponse resp) throws ServletException, IOException {
//				if (resp instanceof HttpServletResponse) {
//					HttpServletResponse r = (HttpServletResponse) resp;
//					r.setHeader("Cache-Control", "no-cache");
//				}
//				super.service(arg0, resp);
//			}
//		};
//		final ServletHolder holder = new ServletHolder(defaultServlet);
//		holder.setInitParameter("useFileMappedBuffer", "false");
//		holder.setInitParameter("org.eclipse.jetty.servlet.Default.cacheControl", "no-store,no-cache,must-revalidate");
//		servletHandler.addServlet(holder, "/");
		

		//-------------------
		final Main resourceHandler = new Main();
		resourceHandler.setWelcomeFiles(new String[]{"index.html"});
		resourceHandler.setResourceBase(".");
		server.setHandler(resourceHandler);
		
		//server.setHandler(webAppContext);
		
		server.start();
		server.join();
	}
}