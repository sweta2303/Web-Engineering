
package mqtt.client;

import org.apache.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.internal.wire.MqttPubAck;
import org.eclipse.paho.client.mqttv3.internal.wire.MqttPublish;

/**
 * @author Jeevan and Sweta
 *
 */
public class mqttCustomClient implements MqttCallback {

	final static Logger logger = Logger.getLogger(mqttCustomClient.class);

	
	/**
	 * This publishes a messages to the topic 
	 * 
	 * @param mqttBroker : EMQ Broker host name
	 * @param port : EMQ broker port
	 * @param topic : EMQ broker topic
	 * @param message : Sensor message
	 * @param qos : Quality of service
	 * @param clientID : Unique client id
	 */
	public void publish(String mqttBroker, String port, String topic, String message, String qos,
			String clientID) {
		try {
			DOMConfigurator.configure("log4j.xml");

			/*
			 * Create a mqtt object with the command line arguments
			 */
			MqttClient uiotClient = new MqttClient("tcp://" + mqttBroker, clientID);

			logger.info("Broker address\t" + mqttBroker + ":" + port);
			logger.info("MQTT Broker is being connecting....\n");

			/*
			 * Connect to the EMQ broker
			 */
			uiotClient.connect();
			uiotClient.setCallback(this);

			/*
			 * Check if EMQ broker connection is successful
			 */
			if (uiotClient.isConnected()) {
				logger.info("Broker:" + mqttBroker + " is connected");
			} else {
				logger.info("Broker not connected");
			}

			logger.info("Message to be published is: " + message + "\n");

			/*
			 * Construct the message to be publish
			 */
			MqttMessage mqttPayload = new MqttMessage(message.getBytes());

			/*
			 * Prepare the publish object with payload 
			 */
			MqttPublish pub = new MqttPublish("publishMessage", mqttPayload);

			/*
			 * Set QoS , time out and publish the message 
			 * to the topic
			 */
			mqttPayload.setQos(Integer.parseInt(qos));
			uiotClient.setTimeToWait(1000);
			uiotClient.publish(topic, mqttPayload);

			/*
			 * Check if any ACK is received
			 */
			logger.info("Message published\n");
			MqttPubAck puback = new MqttPubAck(pub);
			String pubBackStr = puback.toString();
			logger.info("Publish Acknowledgement Details " + pubBackStr);
			/*
			 * Disconnect the client
			 */
			uiotClient.disconnect();
			logger.info("Disconnected\n");
		}

		catch (MqttException me) {
			logger.error("Reason Code for the Exception " + me.getReasonCode());
			logger.error("Description of the Exeception " + me.getMessage());
			logger.error("loc " + me.getLocalizedMessage());
			logger.error("cause " + me.getCause());
			logger.error("excep " + me);
			me.printStackTrace();
		}
	}

	public void subscribe(String mqttBroker, String port, String topic,String qos, String clientID) throws Exception {

		try {

			DOMConfigurator.configure("log4j.xml");

			/*
			 * Create a mqtt object with command line args
			 */
			MqttClient uiotClient = new MqttClient("tcp://" + mqttBroker, clientID);

			logger.info("Broker address\t" + mqttBroker);
			logger.info("MQTT Broker is being connecting....\n");
			
			/*
			 * Connect to the broker
			 */
			uiotClient.connect();
			uiotClient.setCallback(this);
			
			/*
			 * Check if broker connection is success
			 */
			if (uiotClient.isConnected()) {
				logger.info("Broker:" + mqttBroker + " is connected");
			} else {
				logger.info("Broker not connected");
			}
			
			/*
			 * Subscribe to the topic with specific QoS
			 */
			uiotClient.subscribe(topic, Integer.parseInt(qos));
			logger.info("Subscribed to topic : "+ topic);

		} catch (MqttException me) {
			logger.error("Reason Code for the Exception " + me.getReasonCode());
			logger.error("Description of the Exeception " + me.getMessage());
			logger.error("loc " + me.getLocalizedMessage());
			logger.error("cause " + me.getCause());
			logger.error("excep " + me);
			me.printStackTrace();

		}

	}

	@Override
	public void connectionLost(Throwable arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void messageArrived(String topic, MqttMessage message) throws Exception {
	
		/*
		 * Log the received message from the subscribed topic
		 */
		logger.info("Message received is " + message.toString());

	}

}
