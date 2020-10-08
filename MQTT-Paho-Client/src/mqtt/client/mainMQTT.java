package mqtt.client;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Options;

/**
 * @author Jeevan and Sweta
 *
 */
public class mainMQTT {

	public static void main(String[] args) throws Exception {
		{
			/*
			 * Below are the command line arguments to be passed to the JAR
			 */
			Options option = new Options();

			option.addOption("e", "emq", true, "EMQ broker node");
			option.addOption("p", "port", true, "EMQ Port , default its 1883");
			option.addOption("t", "topic", true, "topic");
			option.addOption("m", "message", true, "Message");
			option.addOption("q", "QoS", true, "Qos");
			option.addOption("c", "clientID", true, "Unique string for each instance");
			option.addOption("S", "subscribe", false, "Subscribe");
			option.addOption("P", "Publish", false, "Publish");
			option.addOption("h", "help", false, "Help");

			CommandLineParser parser = new DefaultParser();
			CommandLine cmd = parser.parse(option, args);
			
			/*
			 * In-order to print the helper arguments 
			 */
			if (cmd.hasOption("h")) {
				HelpFormatter formatter = new HelpFormatter();
				formatter.printHelp("Java MQTT Paho Client", option);
				System.exit(1);
			}

			mqttCustomClient pub = new mqttCustomClient();

			/*
			 * Publish and Subscribe function calls based
			 * on the command line arguments
			 */
			if (cmd.hasOption("P")) {
				pub.publish(cmd.getOptionValue("e"), cmd.getOptionValue("p"), cmd.getOptionValue("t"),
						cmd.getOptionValue("m"), cmd.getOptionValue("q"), cmd.getOptionValue("c"));
			}if(cmd.hasOption("S"))
				pub.subscribe(cmd.getOptionValue("e"), cmd.getOptionValue("p"), cmd.getOptionValue("t"),
						cmd.getOptionValue("q"), cmd.getOptionValue("c"));
			}

		}
	}

