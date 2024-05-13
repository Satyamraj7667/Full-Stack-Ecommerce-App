package com.orders.Controller;

import java.util.List;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orders.Model.Orders;
import com.orders.Model.OrderStatus;
import com.orders.Payload.ApiResponse;
import com.orders.Service.OrderService;
import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins="http://localhost:3000")
public class OrderController {

	@Autowired
	private OrderService orderserv;
	
//	@Value("{razorpay.api.key}")
//	String apikey;
//	
//	@Value("{razorpay.api.secret}")
//	String apisecret;
	
//	@GetMapping("/payment/{amount}")
//    public String Payment(@PathVariable Double amount) throws RazorpayException {
//        
//        RazorpayClient razorpayClient = new RazorpayClient(apikey, apisecret);
//        JSONObject orderRequest = new JSONObject();
//        orderRequest.put("amount", amount);
//        orderRequest.put("currency", "INR");
//        orderRequest.put("receipt", "order_receipt_11");
//
//        Order order = razorpayClient.orders.create(orderRequest);
//        String orderId = order.get("id");
//
//        return orderId;
//    }
//	
	
//	public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable UUID orderId) throws RazorpayException{
//		Order order = orderserv.getOrderById(orderId);
//		
//		try {
//			RazorpayClient razor = new RazorpayClient(apikey, apisecret);
//			JSONObject paymentLinkRequest = new JSONObject();
//			paymentLinkRequest.put("amount", order.getTotalAmount()*100);
//			paymentLinkRequest.put("currency", "INR");
//			paymentLinkRequest.put("userid", order.getUserId());
//			
//			
//			JSONObject customer = new JSONObject();
//			customer.put("userid", order.getUserId());
//			
//			JSONObject notify = new JSONObject();
//			notify.put("sms", true);
//			notify.put("email", true);
//			paymentLinkRequest.put("notify", notify);
//			paymentLinkRequest.put("callback_url","http://localhost:3000/user/paymentSuccess/"+order.getId());
//			paymentLinkRequest.put("callback_method", "get");
//			
//			PaymentLink payment = razor.paymentLink.create(paymentLinkRequest);
//			String paymentLinkId = payment.get("id");
//			String paymentLinkUrl = payment.get("short_url");
//			
//			PaymentLinkResponse res = new PaymentLinkResponse();
//			res.setPayment_link_id(paymentLinkId);
//			res.setPayment_link_url(paymentLinkUrl);
//			
//			return new ResponseEntity<PaymentLinkResponse>(res,HttpStatus.CREATED);
//			
//		}
//		catch (Exception e) {
//			// TODO: handle exception
//			throw new RazorpayException(e.getMessage());
//		}
//	}
	
//	public ResponseEntity<ApiResponse> redirect(@RequestParam(name="payment_id") String paymentId, @RequestParam(name="order_id") UUID orderId) throws RazorpayException{
//		Order order = orderserv.getOrderById(orderId);
//		RazorpayClient razorpay = new RazorpayClient(apikey, apisecret);
//		
//		try {
//			Payment payment = razorpay.payments.fetch(paymentId);
//			if(payment.get("status").equals("captured")) {
//				order.setPaymentId(paymentId);
//				order.setStatus(OrderStatus.PLACED);
//				orderserv.saveOrder(order);
//			}
//			
//			ApiResponse apiResponse = new ApiResponse("Your order has been placed",true,HttpStatus.CREATED);
//			return ResponseEntity.ok(apiResponse);
//		} catch (Exception e) {
//			throw new RazorpayException(e.getMessage());
//		}
//	}
	
//	
	
	@Value("${rzp_key_id}")
    private String keyId;

    @Value("${rzp_key_secret}")
    private String secret;
    
    @GetMapping("/payment/{amount}")
    public String Payment(@PathVariable String amount) throws RazorpayException {
        
        RazorpayClient razorpayClient = new RazorpayClient(keyId, secret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_receipt_11");

        Order order = razorpayClient.orders.create(orderRequest);
        String orderId = order.get("id");

        return orderId;
    }
	
    @PostMapping("/payment/{Id}")
    public ResponseEntity<String> getPaymentIdFromFrontend(@PathVariable("Id") UUID Id ,@RequestBody String paymentId) {
    	Orders or = orderserv.getOrderById(Id);
    	or.setPaymentId(paymentId);
    	or.setPaymentStatus("Paid");
    	orderserv.saveOrder(or);
    	return ResponseEntity.ok("Id received successfully");
    }
	
	@GetMapping
	public ResponseEntity<List<Orders>> getAllOrders(){
		List<Orders> l = orderserv.getAllOrders();
		return ResponseEntity.ok(l);
	}
	
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Orders>> getOrdersOfSingleUser(@PathVariable("userId") Long userId){
		List<Orders> l = orderserv.getOrdersByUserId(userId);
		return ResponseEntity.ok(l);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<Orders> getSingleOrderById(@PathVariable("orderId") UUID OrderId){
		Orders or = orderserv.getOrderById(OrderId);
		return ResponseEntity.ok(or);
	}
	
	@PostMapping
	public ResponseEntity<Orders> PlaceOrder(@RequestBody Orders or){
		Orders ord = orderserv.saveOrder(or);
		return ResponseEntity.ok(ord);
	}
	
	@DeleteMapping("/{orderId}")
	public ResponseEntity<String> DeleteOrder(@PathVariable("orderId") UUID orderID){
        orderserv.deleteOrderById(orderID);
        return ResponseEntity.ok("Deleted Successfully");
	}
	
}
